import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { sanitize } from "sanitize-filename-ts";

export default class RenameToSelectionPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "rename-title-to-selection",
			name: "Rename Title To Selection",
			editorCallback: (editor: Editor) => {
				const file = app.workspace.getActiveFile();
				const selection = editor.getSelection();
				const sanitizedSelection = sanitize(selection)
				
				if ((sanitizedSelection != null && sanitizedSelection != "") && file != null) {
					if (selection != sanitizedSelection)
						new Notice("Selection sanitized to create valid filename.");

					// Uses name w/ extension in case path contains selection
					const newName = file.path.replace(file.name, sanitizedSelection) + "." + file.extension;
					app.fileManager.renameFile(file, newName);
				}
				else if (sanitizedSelection != null || file != null)
				{
					console.error("NULL ERROR:\nSelection: ", sanitizedSelection, "\nFile: ", file);
				}
			},
		});
	}
}
