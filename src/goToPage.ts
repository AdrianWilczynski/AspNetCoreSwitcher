import * as vscode from 'vscode';
import * as path from 'path';
import { goTo, dirs, ext } from './shared';

export async function goToPage() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isPageModel(path)) {
        vscode.window.showWarningMessage("This file doesn't look like a valid page model.");
        return;
    }

    await goTo(getPagePath(path), 'Unable to find a matching page.');
}

export async function goToPageModel() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;
    const text = vscode.window.activeTextEditor.document.getText();

    if (!isPage(path, text)) {
        vscode.window.showWarningMessage("This file doesn't look like a valid page.");
        return;
    }

    await goTo(getPageModelPath(vscode.window.activeTextEditor.document.fileName), 'Unable to find a matching page model.');
}

function getPagePath(pageModelPath: string) {
    return path.join(path.dirname(pageModelPath), path.basename(pageModelPath, ext.cshtmlCs) + ext.cshtml);
}

function getPageModelPath(pagePath: string) {
    return path.join(path.dirname(pagePath), path.basename(pagePath, ext.cshtml) + ext.cshtmlCs);
}

function isPageModel(pageModelPath: string) {
    return pageModelPath.endsWith(ext.cshtmlCs) && isLocatedInPagesDir(pageModelPath);
}

function isPage(pagePath: string, pageText: string) {
    return pagePath.endsWith(ext.cshtml) && pageText.includes('@page') && isLocatedInPagesDir(pagePath);
}

function isLocatedInPagesDir(pagePath: string) {
    return pagePath.split(path.sep).includes(dirs.pages);
}
