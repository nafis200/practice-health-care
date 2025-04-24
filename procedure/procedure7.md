1. patient services upsert er kaj hoyeche hoy update hobe or create hobe.

2. Unique na hole upsert kaj korbe na

3. paitent schema delete

model Patient {
  id            String   @id @unique @default(uuid())
  email         String   @unique
  name          String
  profilePhoto  String?
  contactNumber String?
  address       String?
  isDeleted     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  user              User               @relation(references: [email], fields: [email])
  patientHealthData PatientHealthData?
  medicalReport     MedicalReport[]

  @@map("patients")
}

1. first delete patientHealthData PatientHealthData?
  medicalReport     MedicalReport[]

2. then real table

3. then User               @relation(references: [email], fields: [email])

4. Admin Create Schedule Slot.

5. admin created scheduled

6. docter select his/her avaliable time

7. patient select docter avalilable time.

8. schedule services for time

