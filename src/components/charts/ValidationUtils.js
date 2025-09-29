export const validateInputs = (latitude, longitude, startDate, endDate) => {
  const errors = [];

  // Latitude validation
  if (latitude === '' || isNaN(latitude)) {
    errors.push('Latitude is required and must be a number');
  } else if (latitude < -90 || latitude > 90) {
    errors.push('Latitude must be between -90 and 90 degrees');
  }

  // Longitude validation
  if (longitude === '' || isNaN(longitude)) {
    errors.push('Longitude is required and must be a number');
  } else if (longitude < -180 || longitude > 180) {
    errors.push('Longitude must be between -180 and 180 degrees');
  }

  // Date validation
  if (!startDate) {
    errors.push('Start date is required');
  }
  if (!endDate) {
    errors.push('End date is required');
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    if (start > end) {
      errors.push('Start date cannot be after end date');
    }
    
    if (end > today) {
      errors.push('End date cannot be in the future');
    }

    // Check if date range is too large (optional)
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 365) {
      errors.push('Date range cannot exceed 1 year');
    }
  }

  return errors;
};