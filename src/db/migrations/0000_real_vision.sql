CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstname` varchar(50) NOT NULL,
	`lasname` varchar(50) NOT NULL,
	`middlename` varchar(50),
	`birthday` date NOT NULL,
	`age` int NOT NULL,
	`gender` varchar(1) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(256) NOT NULL,
	`role` varchar(11) NOT NULL,
	`active` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
