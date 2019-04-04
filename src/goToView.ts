import * as vscode from 'vscode';
import * as fs from 'fs';
import { goTo, getCurrentLine } from './shared';
import { getViewPath } from './view';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const path = vscode.window.activeTextEditor.document.fileName;

    const viewPath = getViewPath(path, line);
    if (!viewPath || !fs.existsSync(viewPath)) {
        vscode.window.showErrorMessage('Unable to find a matching view.');
        return;
    }

    await goTo(viewPath);
}