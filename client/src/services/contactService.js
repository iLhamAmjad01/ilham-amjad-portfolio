import api from './api';

/**
 * Contact form API service.
 */
const contactService = {
  /**
   * Submit a contact form message.
   * @param {object} data - { name, email, subject, message }
   * @returns {Promise<object>} API response
   */
  sendMessage: async (data) => {
    return api.post('/contact', data);
  },
};

export default contactService;
