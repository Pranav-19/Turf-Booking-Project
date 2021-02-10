function canAddTurf(user){
    return user.role === 'BUSINESS'? true: false
}

module.exports = {
    canAddTurf
}