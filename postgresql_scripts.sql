-- public.jobs definition

-- Drop table

-- DROP TABLE public.jobs;

CREATE TABLE public.jobs (
	id int4 DEFAULT nextval('newtable_id_seq'::regclass) NOT NULL,
	title varchar(256) NULL,
	description text NULL,
	company varchar(256) NULL,
	imageurl text NULL,
	CONSTRAINT newtable_pk PRIMARY KEY (id)
);

INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(1, 'Build Site Volunteers and Volunteer Crew Leads', 'We are in need of volunteers to help complete construction of our future Build projects. When completed, this site will provide affordable homeownership opportunities for our community.Skilled/experienced individuals with a background in construction, renovations and power tool use are very much welcome to apply! We are also qualified and happy to teach any unskilled individuals who have a desire to help and learn on the go!', 'HABITAT FOR HUMANITY GUELPH WELLINGTON', 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/8/12/0/Original_Habitat-for-Humanity_group-shot-workers.jpg.rend.hgtvcom.616.411.suffix/1565625346290.jpeg');
INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(2, 'ReStore Associate', 'The ReStore Associate accepts donations received at the store, from entry into the store to pricing and stocking inventory onto the sales floor, and for providing an excellent customer service experience to both residential and corporate donors.Please fill out our volunteer application, this can be found here: https://habitatgw.ca/volunteer/apply-to-volunteer/', 'HABITAT FOR HUMANITY GUELPH WELLINGTON', 'https://www.habitathillsborough.org/wp-content/uploads/2018/09/Blog-page-ReStore-hiring.jpg');
INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(3, 'Kitchen Salvage Service Crew (aka Deconstruction)', 'The Kitchen Salvage Service crew (also known as the deconstruction crew) helps remove kitchen components from local homes and businesses, and loads it onto the ReStore truck, so that the kitchen can be donated to the Habitat ReStore. When the ReStore sells these kitchens, the funds support Habitat for Humanity''s mission of building affordable homes in our community.Kitchen Salvage Service Crew members are ambassadors of the ReStore and Habitat for Humanity. They will be trained on proper processes, including safety measures. Crew members agree that the donor''s home/business and donation is to be treated with care and respect.', 'HABITAT FOR HUMANITY GUELPH WELLINGTON', 'https://cdn.insteading.com/wp-content/uploads/2016/02/french-country-kitchen-700x385.jpg');
INSERT INTO public.jobs
(id, title, description, company, imageurl)
VALUES(4, 'Be a STEM Role Model - Guelph', 'Volunteering with CAGIS is a rewarding opportunity to inspire the next generation of STEM leaders. By sharing your knowledge and passion, you can spark curiosity and encourage young minds to explore the vast possibilities within science, technology, engineering, and mathematics. Whether leading interactive workshops, organizing field trips, or providing mentorship, your contribution will have a lasting impact on these young enthusiasts’ educational journey and career choices. Together, we can create an inclusive and supportive environment that empowers every participant to reach their full potential.', 'CANADIAN ASSOCIATION FOR GIRLS IN SCIENCE', 'https://www.womenintech.co.uk/wp-content/uploads/2019/03/cc1af223-3367-4cdb-bc4a-d4cf4a503fcb-768x385.png');