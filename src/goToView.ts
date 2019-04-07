import * as vscode from 'vscode';
import * as fs from 'fs';
import { goTo, messages } from './shared';
import { getViewPath, isController, getClosestActionName } from './view';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isController(path)) {
        vscode.window.showWarningMessage(messages.notValid('controller'));
        return;
    }

    const actionName = getClosestActionName(vscode.window.activeTextEditor);
    if (!actionName) {
        vscode.window.showWarningMessage(messages.unableToFindAction);
        return;
    }

    let viewPath = getViewPath(path, actionName);

    if (!fs.existsSync(viewPath)) {
        viewPath = getViewPath(path, actionName, true);
    }

    if (!fs.existsSync(viewPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('view'));
        return;
    }

    await goTo(viewPath);
}