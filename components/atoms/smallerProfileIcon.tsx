import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import Image from "next/image";
import type { FC } from "react";

import { follow } from "../../hooks/profileFunction";

type Props = {
	imgUrl: string;
	api: ApiPromise;
	actingAccount: InjectedAccountWithMeta;
	userId: string;
};

export const SmallerProfileIcon: FC<Props> = (props: Props) => {
	const implementFollow = async () => {
		console.log(
			`LOG: follow actingAccount ${props.actingAccount.address}, followedId ${props.userId}`
		);
		if (confirm("Would you like to follow this account?")) {
			await follow({
				api: props.api,
				actingAccount: props.actingAccount,
				followedId: props.userId,
			});
		}
	};
	return (
		<Image
			onClick={implementFollow}
			className="rounded-full h-12 w-12 mx-2"
			src={props.imgUrl}
			alt="profile_logo"
			width={30}
			height={30}
			quality={100}
		/>
	);
};
