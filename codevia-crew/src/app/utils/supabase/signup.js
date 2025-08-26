import { createClient } from './client'

/**
 * Sign up with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Object} metadata - Additional user metadata (optional)
 * @returns {Object} - { data, error }
 */
export const signUpWithEmail = async (email, password, metadata = {}) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) {
      return { data: null, error: error.message }
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return { 
        data, 
        error: null, 
        message: 'Please check your email for a confirmation link to complete your registration.' 
      }
    }

    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred during signup' }
  }
}

/**
 * Sign up with email, password, and additional user data
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.name - User's full name
 * @param {Object} userData.additionalData - Any additional metadata
 * @returns {Object} - { data, error, message }
 */
export const registerUser = async ({ email, password, name, additionalData = {} }) => {
  try {
    // Validate required fields
    if (!email || !password) {
      return { data: null, error: 'Email and password are required' }
    }

    if (password.length < 6) {
      return { data: null, error: 'Password must be at least 6 characters long' }
    }

    const metadata = {
      full_name: name,
      ...additionalData,
    }

    const result = await signUpWithEmail(email, password, metadata)
    return result
  } catch (err) {
    return { data: null, error: 'Failed to register user' }
  }
}

/**
 * Resend email confirmation
 * @param {string} email - User's email
 * @returns {Object} - { data, error }
 */
export const resendConfirmation = async (email) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })

    if (error) {
      return { data: null, error: error.message }
    }

    return { 
      data, 
      error: null, 
      message: 'Confirmation email has been resent. Please check your inbox.' 
    }
  } catch (err) {
    return { data: null, error: 'Failed to resend confirmation email' }
  }
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - { isValid, errors }
 */
export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Password is required')
    return { isValid: false, errors }
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return { isValid: errors.length === 0, errors }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}