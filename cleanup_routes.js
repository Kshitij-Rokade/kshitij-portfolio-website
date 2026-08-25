const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'server', 'routes');
const files = fs.readdirSync(routesDir);

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  if (file === 'contact.js') {
    // Keep post for contact, but remove others if any
    let content = fs.readFileSync(path.join(routesDir, file), 'utf8');
    content = content.replace(/const\s+auth\s*=\s*require\('\.\.\/middleware\/auth'\);\r?\n?/g, '');
    content = content.split('\n').filter(line => {
        return !line.includes('router.put(') && !line.includes('router.delete(');
    }).join('\n');
    fs.writeFileSync(path.join(routesDir, file), content);
    console.log(`Cleaned contact.js`);
    continue;
  }
  
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove auth import
  content = content.replace(/const\s+auth\s*=\s*require\('\.\.\/middleware\/auth'\);\r?\n?/g, '');
  
  // Remove all router.post, router.put, router.delete
  content = content.split('\n').filter(line => {
    return !line.includes('router.post(') && 
           !line.includes('router.put(') && 
           !line.includes('router.delete(');
  }).join('\n');
  
  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${file}`);
}
