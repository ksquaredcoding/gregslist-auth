export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'ksquaredcoding.us.auth0.com'
export const audience = 'https://ksquaredcoding.us.auth0.com/api/v2/'
export const clientId = 'HQaMtpmgmpJZkIQ38F9n9DzO7MsAwASV'
