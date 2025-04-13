Try + Catch Redundancy
1. Higher Order functions

2. Implement Request Validation Middleware

3. import { z } from "zod";

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional()
    })
});


export const adminValidationSchemas = {
    update
}
4. z.object ekta reuest er moddhe abar body thakbe er moddhe er ekta req thakbe

5. 
<!-- ..........59.3..................... -->

6. Ipagination Object
