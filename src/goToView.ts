import * as vscode from 'vscode';
import { goTo, getCurrentLine } from './shared';
import { getViewPath, isLocationValid } from './view';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isLocationValid(path)) {
        return;
    }

    await goTo(getViewPath(path, line), 'Unable to find a matching view.');
}