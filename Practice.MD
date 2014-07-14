 /*
    Example of Query
     Person
     .find({ occupation: /host/ })
     .where('name.last').equals('Ghost')
     .where('age').gt(17).lt(66)
     .where('likes').in(['vaporizing', 'talking'])
     .limit(10)
     .sort('-occupation')
     .select('name occupation')
     .exec(callback);
    */

    /*
    PUser.findOne({'name.last': 'Doe'}, 'name occupation', function(err, person){
        if(err) return handleError(err);
        console.log('result of findPerson function');
        console.log('%s %s is a %s.', person.name.first, person.name.last, person.age) // Space Ghost is a talk show host.
    })*/