// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('"txt" is now active!');

    const task: (progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken) => Thenable<string> = async (progress, token) => {
        let count = 100;
        await new Promise(resolve => {
            let intervalId = setInterval(() => {
                if (count > 0 && !token.isCancellationRequested) {
                    progress.report({
                        increment: 1,
                        message: `${ count } task(s) left`
                    });
                    count = count - 1;
                    return;
                }
                clearInterval(intervalId);
                resolve(undefined);
            }, 1000);
        });
        return "Foo!";
    };

    const disposables = [];
	disposables.push(...[
        vscode.commands.registerCommand('extension.helloWorld', () => {
            vscode.window.showInformationMessage('Hello World!');
        }),
        vscode.commands.registerCommand('extension.info', () => {
            vscode.window.showInformationMessage('Hello World!');
        }),
        vscode.commands.registerCommand('extension.warning', () => {
            vscode.window.showWarningMessage('Hello World!');
        }),
        vscode.commands.registerCommand('extension.error', () => {
            vscode.window.showErrorMessage('Hello World!');
        }),
        vscode.commands.registerCommand('extension.progress', () => {
            vscode.window.withProgress({ title: "Progress Title", location: vscode.ProgressLocation.Notification, cancellable: true }, task);
        })
    ]);

	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
