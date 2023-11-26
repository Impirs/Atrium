import fs from 'fs';

interface SettingsData {
    user_info: any;
    user_settings: any;
    user_events: any[];
}

const writeSettingsToFile = (data: SettingsData): void => {
    const jsonSettings = JSON.stringify(data, null, 2);
    fs.writeFileSync('../config/settings.json', jsonSettings);
};

const loadSettingsFromFile = (): SettingsData | null => {
    try {
        const rawData = fs.readFileSync('../config/settings.json', 'utf-8');
        const settingsData: SettingsData = JSON.parse(rawData);
        return settingsData;
    } catch (error) {
        console.error('Ошибка при загрузке файла настроек:', (error as Error).message);
        return null;
    }
};

// Пример использования:
const settingsData: SettingsData = {
    user_info: {
        /* данные пользователя */
    },
    user_settings: {
        /* настройки пользователя */
    },
    user_events: [
        /* события пользователя */
    ],
};

writeSettingsToFile(settingsData);

const loadedSettings = loadSettingsFromFile();
if (loadedSettings) {
    console.log('Loaded settings:', loadedSettings);
}
