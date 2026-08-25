const ContactMessage = require('../models/ContactMessage');

// @route   POST /api/contact
// @desc    Submit contact message (public)
// @access  Public
exports.submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });

    // Forward to Google Sheets Webhook if configured
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });
      } catch (webhookErr) {
        console.error('Failed to send to Google Sheets Webhook:', webhookErr);
      }
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/contact
// @desc    Get all messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    
    // Get counts for stats
    const stats = {
      total: await ContactMessage.countDocuments(),
      new: await ContactMessage.countDocuments({ status: 'new' }),
      read: await ContactMessage.countDocuments({ status: 'read' }),
      replied: await ContactMessage.countDocuments({ status: 'replied' }),
      archived: await ContactMessage.countDocuments({ status: 'archived' })
    };

    res.json({ messages, stats });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/contact/:id
// @desc    Update message status
// @access  Private
exports.updateMessage = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    
    if (req.body.status === 'read' && !req.body.readAt) {
      updateData.readAt = new Date();
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/contact/:id
// @desc    Delete message
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.json({ message: 'Message deleted.' });
  } catch (error) {
    next(error);
  }
};
