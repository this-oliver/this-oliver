import EXPERIENCE from "../../enums/experience-enums";

const Oliver = {
	name: "Olivier Manzi",
	bio: {
		short:
			"Hi, my name is **Oliver** and I'm building this resume so that job recruiters can see how competenet and ambitous I am.\nI like solving problems and learning from my mistakes. I read somewhere that job recruiters love people with core beliefs so here goes: I think sustainability should be at the forefront of everything we should be doing.",
		long:
			"I studied Software Engineering at the University of Gothenburg (2017-2020) where I learnt how to build object oriented sofware like a Java library system (in the terminal), taught a car to parallel park in arduino & c++ , taught another car how to manuver through an intersection filled with other cars and road signs (using object-detection, docker and c++) all while coding with people that would become good friends and collegues. <hr/> Shortly afterwards, the * scary music * Covid-19 pandemic hit the world stage and I decided it was just the right time to feed my curioisty, so I began studying a one-year masters program on Entreprenurship and Innovation Management at the Royal Institue of Technology (or KTH) for short. So far, I'm learning how to coordinate resources to exploit opportunities that bring real value to as many stakeholders as possible... but on a much smaller scale since I can't really meet with all my classmates because of online-learning."
	},
	experiences: [
		{
			_id: 0,
			title: "international baccalaureate",
			org: "international school of helsingborg",
			type: EXPERIENCE.education,
			startYear: 2014,
			endYear: 2017,
			description:
				"studied a variaty of classes. my favorites were economics and visual arts. I also came to enjoy mathematics thanks to my teacher (mr. saduma)"
		},
		{
			_id: 1,
			title: "software engineering",
			org: "gothenburg university",
			type: EXPERIENCE.education,
			startYear: 2017,
			endYear: 2020,
			description:
				"read books, learnt how to code, made some cars parallel park themselves and took part in a alot of hackathons."
		},
		{
			_id: 2,
			title: "entreprenurship and innovation",
			org: "kth",
			type: EXPERIENCE.education,
			startYear: 2020,
			endYear: 2021,
			description:
				"pretty much a management course with a sprinkle of entrepreneuship. found many good friends and learnt alot from teachers and fellow classmates due to the multi-diciplinary aspect of the program."
		},
		{
			_id: 3,
			title: "teaching assistant",
			org: "gothenburg university",
			type: EXPERIENCE.job,
			startYear: 2017,
			endYear: 2020,
			description: "supported teachers and taught students in object-oriented programming, programming project and other courses."
		},
		{
			_id: 4,
			title: "software engineering intern",
			org: "aptiv",
			type: EXPERIENCE.job,
			startYear: 2018,
			endYear: 2019,
			description: "got familiar w android and helped build widgets for the little screen inside cars."
		},
		{
			_id: 5,
			title: "technical project lead",
			org: "zesec of sweden",
			type: EXPERIENCE.job,
			startYear: 2019,
			endYear: 2020,
			description: "designed and helped build the zesec ecosystem. this included developing the entire web application and coordintating the development of the mobile and api application. learnt a lot and forever greatful for thomas and his mentorship."
		},
		{
			_id: 6,
			title: "built sdg generator",
			org: "sdg.olivermanzi.com",
			type: EXPERIENCE.projects,
			startYear: 2021,
			endYear: 2021,
			description: "built a tool that randomly picks and sdg goal, a country that relates to the goal and a random article that somehow related to the goal. the purpose of the tool was to help with a hackathon that i organized with some friends."
		},
	]
};

export default Oliver;
