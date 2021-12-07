
# back_caas

Back End Directory for CAAS project

## Contributors
Chris Davidson
Max Domashuk
Matthew Ferreira
Kiryl Basiuk
Bryan Petruescu

## Installation Windows
```bash
python -m venv venv
source venv/Scripts/activate
pip install flask python-dotenv
```

## Installation Linux
```bash
python3 -m venv venv
source venv/bin/activate
pip install flask python-dotenv
```

## Run
```bash
cd caas-api
source venv/.../activate
flask run
```

## Database basic commands (Parts is an example table name)
Query database tables:
from database import Parts
parts = Parts.query.all()

Insert:
from database import Parts
from database import db
part = Parts(1 'for each', 'field', 'pass', 'a value') # need a value for each parameter in def __init__ for each class in database.py
db.session.add(part)
db.session.commit()

to update:
from database import Parts
from database import db
update_part = Parts.query.filter_by(part_id=1).first()
update_part.part_id = '69'
db.session.commit()

To delete:
from database import Parts
from database import db
delete_part = Parts.query.filter_by(part_id=1).first()
db.session.delete(delete_part)
db.session.commit()
