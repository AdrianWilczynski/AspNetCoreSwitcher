import * as vscode from 'vscode';
import * as fs from 'fs';
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

    let viewPath = getViewPath(path, line);
    viewPath = !viewPath || fs.existsSync(viewPath) ? viewPath : getViewPath(path, line, true);

    await goTo(viewPath, 'Unable to find a matching view.');
}