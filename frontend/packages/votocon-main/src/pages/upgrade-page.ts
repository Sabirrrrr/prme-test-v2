import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Router } from '@vaadin/router'
import { UpgradeService } from '../services/upgrade-service'

@customElement('votocon-upgrade-page')
export class VotoconUpgradePage extends LitElement {
    static styles = css`
        // ... existing styles remain the same ...
    `

    @state()
    private isUpgrading = false

    @state()
    private upgradeSuccess = false

    @state()
    private errorMessage = ''

    async performUpgrade() {
        this.isUpgrading = true
        this.errorMessage = ''
        
        try {
            await UpgradeService.upgradeToCorporate()
            this.upgradeSuccess = true
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                Router.go('/dashboard')
            }, 2000)
        } catch (error) {
            this.errorMessage = 'Upgrade failed. Please try again.'
            console.error('Upgrade failed', error)
        } finally {
            this.isUpgrading = false
        }
    }

    render() {
        return html`
            <div class="upgrade-container">
                <div class="upgrade-content">
                    <h1>Corporate Upgrade</h1>
                    <p>Upgrade your account to unlock more features!</p>
                    
                    <button 
                        @click=${this.performUpgrade} 
                        ?disabled=${this.isUpgrading}
                        class="upgrade-button"
                    >
                        ${this.isUpgrading ? 'Upgrading...' : 'Upgrade to Corporate'}
                    </button>

                    ${this.upgradeSuccess ? html`
                        <div class="success-message">
                            Successfully upgraded to Corporate!
                        </div>
                    ` : ''}

                    ${this.errorMessage ? html`
                        <div class="error-message">
                            ${this.errorMessage}
                        </div>
                    ` : ''}
                </div>
            </div>
        `
    }
}