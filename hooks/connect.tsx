import { ApiPromise, WsProvider } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import React, { Dispatch } from "react";

// コントラクトとの接続を行なうために使用するtype
type Props = {
	api: ApiPromise | undefined;
	accountList: InjectedAccountWithMeta[];
	actingAccount: InjectedAccountWithMeta;
	isSetup: boolean;
	setApi: Dispatch<React.SetStateAction<ApiPromise | undefined>>;
	setAccountList: Dispatch<React.SetStateAction<InjectedAccountWithMeta[]>>;
	setActingAccount: Dispatch<
		React.SetStateAction<InjectedAccountWithMeta | undefined>
	>;
	setIsSetup: React.Dispatch<React.SetStateAction<boolean>>;
};
// コントラクトとの接続を行なうための関数
export const connectToContract = async (props: Props) => {
	// rpcのURL
	const blockchainUrl = "ws://127.0.0.1:9944";

	// アカウント情報を取得
	const extensionSetup = async () => {
		const { web3Accounts, web3Enable } = await import(
			"@polkadot/extension-dapp"
		);
		const extensions = await web3Enable("Polk4NET");
		if (extensions.length === 0) {
			return;
		}
		const accounts = await web3Accounts();
		props.setAccountList(accounts);
		props.setActingAccount(accounts[0]);
		props.setIsSetup(true);
	};

	// コントラクトに接続
	const wsProvider = new WsProvider(blockchainUrl);
	const connectedApi = await ApiPromise.create({ provider: wsProvider });
	props.setApi(connectedApi);
	await extensionSetup();
};
