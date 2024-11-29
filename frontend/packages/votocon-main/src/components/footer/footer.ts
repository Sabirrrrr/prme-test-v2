import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthService } from '../../services/auth';
import { UpgradeService } from '../../services/upgrade-service';

interface UserProfile {
  user_type: string;
}

@customElement('votocon-main-footer')
export class VotoconMainFooter extends LitElement {
  @state()
  private isUpgrading = false;

  @state()
  private upgradeMessage = '';

  @state()
  private upgradeSuccess = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #f8f9fa;
      border-top: 1px solid #e9ecef;
      color: #333;
      font-size: 14px;
    }

    .upgrade-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-left: 15px;
    }

    .upgrade-button:hover {
      background-color: #0056b3;
    }

    .upgrade-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .upgrade-message {
      margin-left: 15px;
    }

    .upgrade-message-success {
      color: green;
    }

    .upgrade-message-error {
      color: red;
    }

    .debug-info {
      margin-left: 15px;
    }
  `;

  private async handleUpgrade() {
    this.isUpgrading = true;
    this.upgradeMessage = '';
    this.upgradeSuccess = false;

    try {
      const result = await UpgradeService.upgradeToCorporate();
      
      console.log('Upgrade Result:', result);
      
      this.upgradeSuccess = result.success;
      this.upgradeMessage = result.message || (result.success 
        ? 'Successfully upgraded!' 
        : 'Upgrade failed');
      
      if (result.success) {
        // Reload the page to reflect new status
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Upgrade Error in Footer:', error);
      this.upgradeSuccess = false;
      this.upgradeMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
    } finally {
      this.isUpgrading = false;
    }
  }

  private getUserProfile(): UserProfile | null {
    try {
      const profileString = localStorage.getItem('userProfile');
      if (profileString) {
        const profile = JSON.parse(profileString);
        console.log('Footer getUserProfile:', profile);
        return profile;
      }
      console.log('No user profile found in localStorage');
      return null;
    } catch (error) {
      console.error('Error parsing user profile:', error);
      return null;
    }
  }

  render() {
    const isAuthenticated = AuthService.isAuthenticated();
    const userProfile = this.getUserProfile();
    
    // Debug logging
    console.log('Footer - Is Authenticated:', isAuthenticated);
    console.log('Footer - User Profile:', userProfile);
    
    const canUpgrade = isAuthenticated && userProfile?.user_type === 'individual';
    
    // More debug logging
    console.log('Footer - Can Upgrade:', canUpgrade);

    return html`
      <div class="footer">
        <div> 2024 Votocon. All rights reserved.</div>
        
        ${canUpgrade ? html`
          <button 
            class="upgrade-button" 
            @click=${this.handleUpgrade}
            ?disabled=${this.isUpgrading}
          >
            ${this.isUpgrading ? 'Upgrading...' : 'Upgrade to Corporate'}
          </button>
        ` : html`
          <!-- Debug: Upgrade button not shown -->
          <div class="debug-info">
            ${!isAuthenticated ? 'Not authenticated' : ''}
            ${userProfile ? `User Type: ${userProfile.user_type}` : 'No user profile'}
          </div>
        `}
        
        ${this.upgradeMessage ? html`
          <div class="upgrade-message ${this.upgradeSuccess 
            ? 'upgrade-message-success' 
            : 'upgrade-message-error'}">
            ${this.upgradeMessage}
          </div>
        ` : ''}
      </div>
    `;
  }
}
