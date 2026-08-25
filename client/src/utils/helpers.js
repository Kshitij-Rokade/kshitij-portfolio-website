export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

export const skillCategoryOrder = [
  'programming',
  'frontend',
  'backend',
  'database',
  'apis',
  'tools',
  'cs-fundamentals',
  'other'
];

export const getCategoryLabel = (categoryId) => {
  const categories = {
    'programming': 'Programming Languages',
    'frontend': 'Frontend Development',
    'backend': 'Backend Development',
    'database': 'Databases',
    'tools': 'Development Tools',
    'apis': 'APIs / Integrations',
    'cs-fundamentals': 'Computer Science',
    'fullstack': 'Full Stack',
    'academic': 'Academic',
    'experimental': 'Experimental',
    'foundation': 'Foundation',
    'web-development': 'Web Development',
    'internship': 'Internship',
    'project': 'Project',
    'learning': 'Learning',
    'other': 'Other'
  };
  return categories[categoryId] || categoryId;
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'new': return 'var(--color-primary)';
    case 'read': return 'var(--color-info)';
    case 'replied': return 'var(--color-success)';
    case 'archived': return 'var(--color-text-dim)';
    case 'completed': return 'var(--color-success)';
    case 'in-progress': return 'var(--color-warning)';
    case 'planned': return 'var(--color-text-muted)';
    default: return 'var(--color-text-muted)';
  }
};
