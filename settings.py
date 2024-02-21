# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'FitnessUserData',
        'CLIENT': {
            'host': 'mongodb://localhost:27017',
        }
    }
}
