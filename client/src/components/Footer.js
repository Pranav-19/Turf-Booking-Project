import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";

const Footer = () => {
return (
	<Box >
	<h1 style={{ color: "white",
				textAlign: "center",
				marginTop: "-50px" }}>
		Turf booking: An Online Portal for Sports Enthusiasts
	</h1>
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Aim</FooterLink>
			<FooterLink href="#">Vision</FooterLink>
			<FooterLink href="#">Testimonials</FooterLink>
		</Column>
		{/* <Column>
			<Heading>Services</Heading>
			<FooterLink href="#">Booking</FooterLink>
			<FooterLink href="#">Business</FooterLink>
		</Column> */}
		<Column>
			<Heading>Contact Us</Heading>
			<FooterLink href="/contact">Contact</FooterLink>
			{/* <FooterLink href="/contact">Ahemdabad</FooterLink>
			<FooterLink href="/contact">Indore</FooterLink>
			<FooterLink href="/contact">Mumbai</FooterLink> */}
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;