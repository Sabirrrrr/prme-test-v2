import { AuthService } from './auth';

export class UpgradeService {
  private static readonly API_URL = '/api';

  static async upgradeToCorporate(): Promise<{ success: boolean, message?: string }> {
    const token = localStorage.getItem('token');
    if (!token) {
      return { 
        success: false, 
        message: 'No authentication token found. Please log in again.' 
      };
    }

    try {
      console.log('Attempting to upgrade with token:', token);
      console.log('Full URL:', `${this.API_URL}/upgrade/upgrade-to-corporate`);

      const response = await fetch(`${this.API_URL}/upgrade/upgrade-to-corporate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const responseData = await response.text(); 
      console.log('Response body:', responseData);

      if (!response.ok) {
        return { 
          success: false, 
          message: responseData || 'Failed to upgrade to corporate status' 
        };
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseData);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
      }

      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        localStorage.setItem('userProfile', JSON.stringify(currentUser));
      }

      return { 
        success: true, 
        message: parsedResponse?.message || 'Successfully upgraded to corporate status!' 
      };
    } catch (error) {
      console.error('Upgrade to Corporate Error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  }
}
