import { developmentConfig } from '../env/development';
import { productionConfig } from '../env/production';

export class AppSettings {
    private static instance: AppSettings;
    public config;

    private constructor() {
        this.config = process.env.NODE_ENV === 'production' 
            ? productionConfig 
            : developmentConfig;
    }

    public static getInstance(): AppSettings {
        if (!AppSettings.instance) {
            AppSettings.instance = new AppSettings();
        }
        return AppSettings.instance;
    }

    public getConfig() {
        return this.config;
    }
}