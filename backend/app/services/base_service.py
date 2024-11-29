from typing import Generic, TypeVar
from ..repositories.base_repository import BaseRepository

RepositoryType = TypeVar("RepositoryType", bound=BaseRepository)

class BaseService(Generic[RepositoryType]):
    def __init__(self, repository: RepositoryType):
        self.repository = repository

    def get(self, id: int):
        return self.repository.get(id)

    def get_all(self):
        return self.repository.get_all()

    def create(self, obj_in):
        return self.repository.create(obj_in)

    def update(self, id: int, obj_in):
        db_obj = self.repository.get(id)
        if db_obj:
            return self.repository.update(db_obj, obj_in)
        return None

    def delete(self, id: int):
        return self.repository.delete(id)
