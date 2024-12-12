export const getUserProfile = `
    SELECT 
        Account.id, 
        Account.email, 
        Account.role, 
        UserProfile.user_name, 
        UserProfile.user_profile, 
        UserProfile.user_address, 
        UserProfile.bio, 
        UserProfile.linkedin, 
        UserProfile.twitter, 
        UserProfile.instagram, 
        UserProfile.phone_number, 
        UserProfile.file_resume,
        UserProfile.type_of_work, 
        UserProfile.position 
    FROM 
        Account 
    LEFT JOIN 
        UserProfile 
    ON 
        Account.id = UserProfile.account_id 
    WHERE 
        Account.id = ?
`;

export const getCompanyProfile = `
    SELECT 
        Account.id, 
        Account.email, 
        Account.role, 
        CompanyProfile.company_name, 
        CompanyProfile.company_profile, 
        CompanyProfile.company_address, 
        CompanyProfile.company_location, 
        CompanyProfile.website, 
        CompanyProfile.phone_number, 
        CompanyProfile.about_headline, 
        CompanyProfile.about_body, 
        CompanyProfile.about_visi, 
        CompanyProfile.about_misi 
    FROM 
        Account 
    LEFT JOIN 
        CompanyProfile 
    ON 
        Account.id = CompanyProfile.account_id 
    WHERE 
        Account.id = ?
`;
