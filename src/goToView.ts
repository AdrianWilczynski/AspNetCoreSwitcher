import * as vscode from 'vscode';
import * as fs from 'fs';
import { goTo, getCurrentLine, messages } from './shared';
import { getViewPath, isController, getActionName } from './view';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isController(path)) {
        vscode.window.showWarningMessage(messages.notValid('controller'));
        return;
    }

    const actionName = getActionName(line);
    if (!actionName) {
        vscode.window.showWarningMessage(messages.notMethodDeclaration);
        return;
    }

    let viewPath = getViewPath(path, actionName);

    if (!fs.existsSync(viewPath)) {
        viewPath = getViewPath(path, actionName, true);
    }

    if (!fs.existsSync(viewPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('view'));
    }

    await goTo(viewPath);
}