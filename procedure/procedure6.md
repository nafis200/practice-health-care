1. 63-3 req.body te profile picture update

2. Fixing Type Error And Creating Specialities And DocterSpecialist
63-4

3. 63-4 Docter Specialist.

4. Many to Many relationShip

5. model DoctorSpecialties {
  specialitiesId String
  specialities   Specialties @relation(fields: [specialitiesId], references: [id])

  doctorId String
  doctor   Doctor @relation(fields: [doctorId], references: [id])

  @@id([specialitiesId, doctorId])
  @@map("doctor_specialties")
}

6. Docter er update huge much transaction.

7. Docter Services Update onek taught So retrive this