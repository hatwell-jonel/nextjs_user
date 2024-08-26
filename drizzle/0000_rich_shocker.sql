CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstname` varchar(255),
	`lasname` varchar(255),
	`middlename` varchar(255),
	`birthday` date,
	`age` int,
	`gender` varchar(10),
	`email` varchar(255),
	`password` varchar(255),
	`role` varchar(50),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
