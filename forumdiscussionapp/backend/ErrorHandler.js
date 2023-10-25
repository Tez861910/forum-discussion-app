
const handleDatabaseError = (err, res) => {
    console.error('Database error:', err);
    res.json({ error: { code: 'E500', message: 'Database error' } });
  };

  // Function to handle validation errors
  const handleValidationErrors = (errors, res) => {
    res.json({ error: { code: 'E422', message: 'Validation failed', details: errors.array() } });
  };
  
  module.exports = { handleDatabaseError, handleValidationErrors };
  