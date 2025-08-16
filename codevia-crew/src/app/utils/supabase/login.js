import { supabase } from './client'

/**
 * Sign in with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} - { data, error }
 */
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred during login' }
  }
}

/**
 * Sign in with OAuth provider (Google, GitHub, etc.)
 * @param {string} provider - OAuth provider name
 * @param {string} redirectTo - URL to redirect after authentication
 * @returns {Object} - { data, error }
 */
export const signInWithOAuth = async (provider, redirectTo = window.location.origin) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    return { data: null, error: `Failed to sign in with ${provider}` }
  }
}

/**
 * Sign out current user
 * @returns {Object} - { error }
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (err) {
    return { error: 'Failed to sign out' }
  }
}

/**
 * Get current user session
 * @returns {Object} - { data, error }
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return { data: null, error: error.message }
    }

    return { data: user, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to get current user' }
  }
}

/**
 * Get current session
 * @returns {Object} - { data, error }
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      return { data: null, error: error.message }
    }

    return { data: session, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to get session' }
  }
}