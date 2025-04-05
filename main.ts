import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { sanitize } from "sanitize-filename-ts";

export default class RenameToSelectionPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "rename-File-to-selection",
			name: "Rename file to selection",

			editorCheckCallback(checking: boolean, editor: Editor, ctx) {
				const file = this.app.workspace.getActiveFile();
				const selection = editor.getSelection();
				const sanitizedSelection = sanitize(selection)
				
				if ((sanitizedSelection != null && sanitizedSelection != "") && file != null) {
					if (!checking)
					{
						if (selection != sanitizedSelection)
							new Notice("Selection sanitized to create valid filename");
	
						// Uses name w/ extension in case path contains selection
						const newName = file.path.replace(file.name, sanitizedSelection) + "." + file.extension;
						this.app.fileManager.renameFile(file, newName);
					}
					return true;
				}

				return false;
			},
		});
	}
}
