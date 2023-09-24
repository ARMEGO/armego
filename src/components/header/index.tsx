import { Button } from "primereact/button";
import { Link } from "wouter";
import { Path } from "../../routes";
import styled from "styled-components";

type IProps = {
	username: string;
	onLogOut: () => void;
};

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 16px;
	background: #dadada;
`;

function Header(props: IProps) {
	return (
		<StyledHeader>
			<h1>
				<Link href={Path.HOME}>Welcome, {props.username}</Link>
			</h1>
			<Button
				label="Sign out"
				className="p-button-outlined"
				onClick={props.onLogOut}
			/>
		</StyledHeader>
	);
}

export default Header;
