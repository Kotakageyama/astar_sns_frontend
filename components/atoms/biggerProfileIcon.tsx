import Image from "next/image";
import type { FC } from "react";

type Props = {
	imgUrl: string;
};

const BiggerProfileIcon: FC<Props> = (props: Props) => {
	return (
		<Image
			className="rounded-full h-24 w-24 mx-2"
			src={props.imgUrl}
			alt="profile_logo"
			width={30}
			height={30}
			quality={100}
		/>
	);
};

export default BiggerProfileIcon;
