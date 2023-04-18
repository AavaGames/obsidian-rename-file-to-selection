import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface RenameToSelectionPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: RenameToSelectionPluginSettings = {
	mySetting: 'default'
}

export default class RenameToSelectionPlugin extends Plugin {
	settings: RenameToSelectionPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dice', 'Sample Plugin', () => {
			new Notice('This is a notice!');
		});

		this.addCommand({
			id: "rename-title-to-selection",
			name: "Rename Title To Selection",
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				this.setTitle(selection);
			},
		});

		this.addCommand({
			id: "rename-header-to-selection",
			name: "Rename Header To Selection",
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				this.setHeading(selection);
			},
		});

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class RenameToSelectionModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class RenameToSelectionSettingTab extends PluginSettingTab {
	plugin: RenameToSelectionPlugin;

	constructor(app: App, plugin: RenameToSelectionPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
