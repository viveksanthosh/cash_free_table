function formatUserData({ name, username, email, id, phone, website, company, address }) {
    return ({
        id, name, username, email, phone, website,
        company: company.name, address: `${address.suite}, ${address.street}, ${address.city}`
    })
}

export { formatUserData }