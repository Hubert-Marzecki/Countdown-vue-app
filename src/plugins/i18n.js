import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            title: "Welcome in Countdown App",
            instruction: "Insert date in current format : DD/MM/YYYY hh:mm:ss",
            addButton: "Add Countdown",
            listHeader: "Countdowns list",
            emptyMessage: "List is empty",
            removeButton: "Remove"
        },
        de: {
            title: "Willkommen in der Countdown App",
            instruction: "Datum im aktuellen Format einfügen: DD/MM/YYYY hh:mm:ss",
            addButton: "Countdown hinzufügen",
            listHeader: "Countdown-Liste",
            emptyMessage: "Liste ist leer",
            removeButton: "Entfernen"


        },
        fr: {
            title: "Bienvenue dans l'application Countdown",
            instruction: "Insérer la date au format actuel: DD/MM/YYYY hh:mm:ss",
            addButton: "Ajouter un compte à rebours",
            listHeader: "Liste des comptes à rebours",
            emptyMessage: "La liste est vide",
            removeButton: "Supprimer"
        }
    }
})