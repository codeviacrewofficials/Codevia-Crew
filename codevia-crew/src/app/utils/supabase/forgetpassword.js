import { Supabase } from './client.js'

/**
 * Send password reset email
 * @param {string} email - User's email address
 * @param {string} redirectTo - URL to redirect after password reset (optional)
 * @returns {Object} - { data, error, message }
 */
export const sendPasswordResetEmail = async (email, redirectTo = null) => {
  try {
    if (!email) {
      return { data: null, error: 'Email address is required' }
    }

    const options = redirectTo ? { redirectTo } : {}
    
    const { data, error } = await Supabase.auth.resetPasswordForEmail(email, options)

    if (error) {
      return { data: null, error: error.message }
    }

    return { 
      data, 
      error: null, 
      message: 'Password reset email has been sent. Please check your inbox and follow the instructions.' 
    }
  } catch (err) {
    return { data: null, error: 'Failed to send password reset email' }
  }
}

/**
 * Update user password (used after clicking reset link)
 * @param {string} newPassword - New password
 * @returns {Object} - { data, error }
 */
export const updatePassword = async (newPassword) => {
  try {
    if (!newPassword) {
      return { data: null, error: 'New password is required' }
    }

    if (newPassword.length < 6) {
      return { data: null, error: 'Password must be at least 6 characters long' }
    }

    const { data, error } = await Supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      return { data: null, error: error.message }
    }

    return { 
      data, 
      error: null, 
      message: 'Password has been updated successfully' 
    }
  } catch (err) {
    return { data: null, error: 'Failed to update password' }
  }
}

/**
 * Verify if user has a valid session for password reset
 * @returns {Object} - { isValid, error }
 */
export const verifyResetSession = async () => {
  try {
    const { data: { session }, error } = await Supabase.auth.getSession()
    
    if (error) {
      return { isValid: false, error: error.message }
    }

    // Check if session exists and is valid for password reset
    if (!session) {
      return { isValid: false, error: 'No valid session found. Please request a new password reset link.' }
    }

    return { isValid: true, error: null }
  } catch (err) {
    return { isValid: false, error: 'Failed to verify reset session' }
  }
}

/**
 * Handle password reset callback (when user clicks the reset link)
 * This should be called on the password reset page
 * @returns {Object} - { isValid, error }
 */
export const handlePasswordResetCallback = async () => {
  try {
    // Get the current URL hash parameters
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')
    const type = hashParams.get('type')

    if (type !== 'recovery' || !accessToken) {
      return { isValid: false, error: 'Invalid password reset link' }
    }

    // Set the session with the tokens from the URL
    const { data, error } = await Supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    })

    if (error) {
      return { isValid: false, error: error.message }
    }

    return { isValid: true, error: null, data }
  } catch (err) {
    return { isValid: false, error: 'Failed to process password reset link' }
  }
}

/**
 * Validate email format for password reset
 * @param {string} email - Email to validate
 * @returns {Object} - { isValid, error }
 */
export const validateResetEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'Email address is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  return { isValid: true, error: null }
}