import UserRole from "../constants/UserRole";

class User {
  static nextId = 0;

  constructor(name, surname, email, password, phone, address, birthDate, profileImage = null, createdAt = new Date(), isConfirmed = false, userRole = UserRole.USER) {
      this.id = ++User.nextId;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.password = password;
      this.phone = phone;
      this.address = address;
      this.birthDate = birthDate;
      this.profileImage = profileImage;
      this.createdAt = createdAt;
      this.lastUpdatedAt = createdAt;
      this.isConfirmed = isConfirmed;
      this.userRole = userRole;
  }

  getUserInfo() {
      return `${this.name} ${this.surname} - ${this.email}`;
  }

  updateProfile(newName, newSurname, newEmail, newPassword, newPhone, newAddress, newBirthDate, newProfileImage, newIsConfirmed, newUserRole) {
      this.name = newName || this.name;
      this.surname = newSurname || this.surname;
      this.email = newEmail || this.email;
      this.password = newPassword || this.password;
      this.phone = newPhone || this.phone;
      this.address = newAddress || this.address;
      this.birthDate = newBirthDate || this.birthDate;
      this.profileImage = newProfileImage || this.profileImage;
      this.isConfirmed = newIsConfirmed !== undefined ? newIsConfirmed : this.isConfirmed;
      this.userRole = newUserRole !== undefined ? newUserRole : this.userRole;
      this.lastUpdatedAt = new Date();
  }
}

export default User;
