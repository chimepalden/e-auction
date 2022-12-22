export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }
  constructorSpy(_createEntityData: T): void {}

  async create(): Promise<T> {
    return this.entityStub;
  }

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndDelete(): Promise<T> {
    return this.entityStub;
  }
}
