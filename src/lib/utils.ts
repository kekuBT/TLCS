import { UserRole } from "@prisma/client";

/**
 *  Returns a UserRole object from string representation
 */
export function roleMapper(role: string): UserRole {
  switch (role) {
    case "student":
      return UserRole.STUDENT;
    case "college_coordinator":
      return UserRole.COLLEGE_COORDINATOR;
    case "instructor":
      return UserRole.INSTRUCTOR;
    case "admin":
      return UserRole.ADMIN;
    case "depthead":
      return UserRole.DEPTHEAD;
    default:
      throw new Error("Invalid role argument");
  }
}

export function capitalize(text: string): string {
  return text[0] + text.slice(1).toLowerCase();
}
