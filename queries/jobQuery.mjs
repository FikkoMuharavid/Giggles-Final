export const getAllJob = `
    SELECT 
        PostJob.*,
        CompanyProfile.company_name,
        CompanyProfile.company_profile,
        CompanyProfile.company_address,
        CompanyProfile.company_location,
        CompanyProfile.company_email,
        CompanyProfile.website,
        CompanyProfile.phone_number 
    FROM 
        PostJob 
    LEFT JOIN
        CompanyProfile
    ON
        PostJob.company_id = CompanyProfile.account_id
`;

export const getAllJobByCategory = `
    SELECT 
        PostJob.*,
        CompanyProfile.company_name,
        CompanyProfile.company_profile,
        CompanyProfile.company_address,
        CompanyProfile.company_location,
        CompanyProfile.company_email,
        CompanyProfile.website,
        CompanyProfile.phone_number 
    FROM 
        PostJob 
    LEFT JOIN
        CompanyProfile
    ON
        PostJob.company_id = CompanyProfile.account_id
    WHERE 
        category = ?
`;

export const getLatestJob = `
    SELECT 
        PostJob.*,
        CompanyProfile.company_name,
        CompanyProfile.company_profile,
        CompanyProfile.company_address,
        CompanyProfile.company_location,
        CompanyProfile.company_email,
        CompanyProfile.website,
        CompanyProfile.phone_number 
    FROM 
        PostJob 
    LEFT JOIN
        CompanyProfile
    ON
        PostJob.company_id = CompanyProfile.account_id
    ORDER BY
        time DESC
`;

export const getJobById = `
    SELECT 
        PostJob.*,
        CompanyProfile.company_name,
        CompanyProfile.company_profile,
        CompanyProfile.company_address,
        CompanyProfile.company_location,
        CompanyProfile.company_email,
        CompanyProfile.website,
        CompanyProfile.phone_number,
        CompanyProfile.about_body
    FROM 
        PostJob 
    LEFT JOIN
        CompanyProfile
    ON
        PostJob.company_id = CompanyProfile.account_id
    WHERE
        PostJob.id = ?
`;

export const getJobByCompanyId = `
    SELECT 
        PostJob.*,
        CompanyProfile.company_name,
        CompanyProfile.company_profile,
        CompanyProfile.company_address,
        CompanyProfile.company_location,
        CompanyProfile.company_email,
        CompanyProfile.website,
        CompanyProfile.phone_number 
    FROM 
        PostJob 
    LEFT JOIN
        CompanyProfile
    ON
        PostJob.company_id = CompanyProfile.account_id
    WHERE
        PostJob.company_id = ?
`;
