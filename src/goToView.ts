import * as vscode from 'vscode';
import { goTo, getCurrentLine } from './shared';
import { getViewPath, isController } from './view';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isController(path)) {
        vscode.window.showWarningMessage("This file doesn't look like a valid controller.");
        return;
    }

    await goTo(getViewPath(path, line), 'Unable to find a matching view.');
}