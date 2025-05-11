export class I18nManager {
    private static translations: Record<string, string> = {};
    private static defaultTranslations: Record<string, string> = {};
  
    /**
     * init the i18n manager with default translations.
     * @param defaultTranslations default translations to use.
     */
    public static initialize(defaultTranslations: Record<string, string>): void {
      this.defaultTranslations = defaultTranslations;
      this.translations = { ...defaultTranslations }; // by default, use default translations
    }
  
    /**
     * Load translations from a JSON file.
     * @param jsonUrl URL of the JSON file containing translations.
     */
    public static async loadTranslations(jsonUrl: string): Promise<void> {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        this.translations = { ...this.defaultTranslations, ...data }; // Merge with default translations
      } catch (error) {
        console.error('Erreur lors du chargement des traductions :', error);
        this.translations = { ...this.defaultTranslations }; // Rollback to default translations on error
      }
    }
  
    /**
     * retreive a translated string by its key.
     * @param key key of the string to translate.
     * @returns returns the translated string or an empty string if not found.
     */
    public static getString(key: string): string {
      return this.translations[key] || this.defaultTranslations[key] || '';
    }
  }