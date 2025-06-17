CREATE TABLE "user_for_test" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"status" text NOT NULL,
	CONSTRAINT "user_for_test_email_unique" UNIQUE("email")
);
