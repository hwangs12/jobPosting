import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
	const [loading, setLoading] = useState(true);
	const [developers, setDevelopers] = useState([]);
	const [postingId, setPostingId] = useState("recAGJfiU4CeaV0HL");

	const fetchData = async () => {
		const data = await fetch(url);
		const jsonData = await data.json();
		setDevelopers(jsonData);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const seePosting = (id) => {
		setPostingId(id);
	};

	if (loading) {
		return (
			<section className="section loading">
				<h1>loading...</h1>
			</section>
		);
	}

	return (
		<section className="section">
			<div className="title">
				<h2>Experience</h2>
				<div className="underline"></div>
			</div>
			<div className="jobs-center">
				<div className="btn-container">
					{developers.map((developer) => {
						const { id, company } = developer;
						return (
							<button
								key={id}
								className={`job-btn ${
									postingId === id ? "active-btn" : "false"
								}`}
								onClick={() => seePosting(id)}
							>
								{company}
							</button>
						);
					})}
				</div>

				{developers
					.filter((developer) => {
						return developer.id === postingId;
					})
					.map((developer) => {
						const { id, title, company, dates, duties } = developer;
						return (
							<article key={id} className="job-info">
								<h3>{title}</h3>
								<h4>{company}</h4>
								<p className="job-date">{dates}</p>
								{duties.map((duty, i) => {
									return (
										<div key={i} className="job-desc">
											<FaAngleDoubleRight />
											<p>{duty}</p>
										</div>
									);
								})}
							</article>
						);
					})}
			</div>
			<button type="button" className="btn">
				more info
			</button>
		</section>
	);
}

export default App;
