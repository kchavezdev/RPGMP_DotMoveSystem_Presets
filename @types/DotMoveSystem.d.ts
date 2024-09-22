/*
MIT License

Copyright (c) 2020 unagiootoro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* @ts-expect-error */
import {Game_CharacterBase, Game_Player, Game_Event, Game_Follower} from 'rmmz-types';

declare interface Window {
    MoverData: new () => DotMoveSystem.MoverData;
}
declare interface Game_Map {
    clearAllCharactersMovedFlag(): void;
    initMapCharactersCache(): void;
    allCharacters(): Set<Game_CharacterBase>;
}
declare interface Game_CharacterBase {
    _width?: number;
    _height?: number;
    _offsetX?: number;
    _offsetY?: number;
    _slideLengthX?: number;
    _slideLengthY?: number;
    _totalDpf: number;
    _moveUnit: number;
    _moved: boolean;
    _clearMovedFlagRequested: boolean;
    _moving: boolean;
    _setThroughReserve?: boolean;
    _setMoveSpeedReserve?: number;
    _moverData: DotMoveSystem.MoverData;
    createDotMoveTempData(): DotMoveSystem.CharacterDotMoveTempData;
    dotMoveTempData<T extends DotMoveSystem.CharacterDotMoveTempData>(): T;
    mover(): DotMoveSystem.CharacterMover;
    moverData(): DotMoveSystem.MoverData;
    width(): number;
    setWidth(width: number): void;
    height(): number;
    setHeight(height: number): void;
    offsetX(): number;
    setOffsetX(offsetX: number): void;
    offsetY(): number;
    setOffsetY(offsetY: number): void;
    slideLengthX(): number;
    setSlideLengthX(slideLengthX: number): void;
    slideLengthY(): number;
    setSlideLengthY(slideLengthY: number): void;
    needDiagonalSlideX(): boolean;
    needDiagonalSlideY(): boolean;
    updatePostMove(): void;
    isMoved(): boolean;
    moveUnit(): number;
    setMoveUnit(moveUnit: number): void;
    incrementTotalDpf(dpf: number): void;
    positionPoint(): DotMoveSystem.DotMovePoint;
    centerPositionPoint(): DotMoveSystem.DotMovePoint;
    setPositionPoint(point: DotMoveSystem.DotMovePoint): void;
    centerRealX(): number;
    centerRealY(): number;
    minTouchWidth(): number;
    minTouchHeight(): number;
    collisionRect(): DotMoveSystem.DotMoveRectangle;
    updateMapCharactersCache(): void;
    removeMapCharactersCache(): void;
    prepareUpdate(): void;
    clearMovedFlagIfRequested(): void;
    moveCallback(moved: boolean, dpf: number): void;
    canPass(x: number, y: number, d: number, opt?: {
        needCheckCharacters?: boolean;
    }): boolean;
    canPassDiagonally(x: number, y: number, horz: number, vert: number, opt?: {
        needCheckCharacters?: boolean;
    }): boolean;
    isCollidedWithCharacters(x: number, y: number, d?: number): boolean;
    calcDeg(targetCharacter: Game_CharacterBase): number;
    calcFar(targetCharacter: Game_CharacterBase): number;
    stopMove(): void;
    resumeMove(): void;
    cancelMove(): void;
    checkCharacter<T extends Game_CharacterBase>(character: T): DotMoveSystem.CollisionResult<T> | undefined;
    checkHitCharacters<T extends Game_CharacterBase>(targetCharacterClass: (new (...args: any[]) => T)): DotMoveSystem.CollisionResult<T>[];
    checkCollisionTargetCharacter(x: number, y: number, d: number, character: Game_CharacterBase): boolean;
    checkCollisionTargetPlayer(x: number, y: number, d: number, player: Game_Player): boolean;
    checkCollisionTargetFollower(x: number, y: number, d: number, follower: Game_Follower): boolean;
    checkCollisionTargetEvent(x: number, y: number, d: number, event: Game_Event): boolean;
    checkCollisionTargetVehicle(x: number, y: number, d: number, vehicle: Game_Vehicle): boolean;
}
declare interface Game_Character {
    findDirectionTo(goalX: number, goalY: number, searchLimit?: number): number;
    dotMoveByDeg(deg: number): void;
    moveByDirection(direction: number): void;
    dotMoveToPlayer(): void;
    moveToTarget(x: number, y: number): void;
    deltaRealXFrom(x: number): number;
    deltaRealYFrom(y: number): number;
    isCollidedWithCharacters(x: number, y: number, d?: number): boolean;
}
declare interface Game_Player {
    _needCountProcess: boolean;
    _gatherStart: boolean;
    _shipOrBoatTowardingLand: boolean;
    _getOffVehicleIntPos: boolean;
    _moveSpeedBeforeGetOnVehicle: number;
    startTouchMove(): void;
    forceMoveOnVehicle(): void;
    forceMoveOffAirship(): void;
    forceMoveOffShipOrBoat(): void;
    updateRemoveCollideTriggerEventIds(): void;
    updateCountProcess(sceneActive: boolean): void;
    setupCollideTriggerEventIds(x?: number, y?: number): void;
    checkRideVehicles(): string | undefined;
    getOffAirship(): boolean;
    getOffShipOrBoat(): boolean;
    checkAirshipLandOk(pos: DotMoveSystem.DotMovePoint): boolean;
    checkShipOrBoatLandOk(pos: DotMoveSystem.DotMovePoint): boolean;
    isGetOffCollided(pos: DotMoveSystem.DotMovePoint): boolean;
    getOffVehicleLastPhase(): void;
    updateTowardLandShipOrBoat(): void;
    startMapEventFront(x: number, y: number, d: number, triggers: number[], normal: boolean, isTouch: boolean): void;
    dotMoveToPlayer(): void;
}
declare interface Game_Event {
    _widthArea?: number;
    _heightArea?: number;
    getAnnotationValues(page: number): {
        [key: string]: string | undefined;
    };
    getAnnotation(page: number): string;
    widthArea(): number;
    setWidthArea(widthArea: number): void;
    heightArea(): number;
    setHeightArea(heightArea: number): void;
}
declare interface Game_Follower {
    isPrecedingCharacterNearDirection(character: Game_CharacterBase, moveDeg: number): boolean;
    gatherCharacter(character: Game_CharacterBase): void;
    changeFollowerSpeed(precedingCharacterFar: number): void;
    calcFollowerSpeed(precedingCharacterFar: number): number;
}
declare interface Game_Followers {
    _gatherCount: number;
    updateGather(): void;
}
declare interface Game_Vehicle {
    mapId(): number;
}
declare interface Game_Temp {
    _characterTempDatas: Map<Game_CharacterBase, DotMoveSystem.CharacterDotMoveTempData>;
    _mapCharactersCache?: DotMoveSystem.MapCharactersCache;
    _beforeTouchMovedPoint?: DotMoveSystem.DotMovePoint;
    _lastAllCharacters: Set<Game_CharacterBase>;
    characterTempData(character: Game_CharacterBase): DotMoveSystem.CharacterDotMoveTempData;
    initCharacterTempDatas(): void;
    setupMapCharactersCache(width: number, height: number): void;
    mapCharactersCache(): DotMoveSystem.MapCharactersCache | undefined;
    beforeTouchMovedPoint(): DotMoveSystem.DotMovePoint | undefined;
    setBeforeTouchMovedPoint(point: DotMoveSystem.DotMovePoint | undefined): void;
    removeUnusedCache(): void;
}
declare const DotMoveSystemPluginName: string;
declare namespace DotMoveSystem {
    class DotMovePoint {
        private _x;
        private _y;
        get x(): number;
        set x(_x: number);
        get y(): number;
        set y(_y: number);
        static fromDegAndFar(deg: Degree, far: number): DotMovePoint;
        constructor(...args: [number?, number?]);
        initialize(x?: number, y?: number): void;
        clone(): DotMovePoint;
        equals(point: DotMovePoint): boolean;
        add(point: DotMovePoint): DotMovePoint;
        calcDeg(targetPoint: DotMovePoint): Degree;
        calcFar(targetPoint: DotMovePoint): number;
    }
    class DotMoveRectangle {
        private _x;
        private _y;
        private _width;
        private _height;
        get x(): number;
        set x(_x: number);
        get y(): number;
        set y(_y: number);
        get width(): number;
        set width(_width: number);
        get height(): number;
        set height(_height: number);
        get x2(): number;
        get y2(): number;
        constructor(...args: [number?, number?, number?, number?]);
        initialize(x?: number, y?: number, width?: number, height?: number): void;
        clone(): DotMoveRectangle;
        equals(rect: DotMoveRectangle): boolean;
        isCollidedRect(rect: DotMoveRectangle): boolean;
        union(rect: DotMoveRectangle): DotMoveRectangle;
    }
    class Degree {
        private _value;
        get value(): number;
        static UP: Degree;
        static UP_RIGHT: Degree;
        static RIGHT: Degree;
        static RIGHT_DOWN: Degree;
        static DOWN: Degree;
        static DOWN_LEFT: Degree;
        static LEFT: Degree;
        static LEFT_UP: Degree;
        static fromDirection(direction: number): Degree;
        static fromRad(rad: number): Degree;
        constructor(...args: [number]);
        initialize(value: number): void;
        toRad(): number;
        toDirection8(): number;
        toDirection4(lastDirection: number): number;
    }
    class AStarNode {
        private _parent?;
        private _x;
        private _y;
        private _f;
        private _g;
        private _closed;
        get parent(): AStarNode | undefined;
        set parent(_parent: AStarNode | undefined);
        get x(): number;
        get y(): number;
        get f(): number;
        set f(_f: number);
        get g(): number;
        set g(_g: number);
        get closed(): boolean;
        set closed(_closed: boolean);
        constructor(...args: [AStarNode | undefined, number, number, number, number, boolean?]);
        initialize(parent: AStarNode | undefined, x: number, y: number, f: number, g: number, closed?: boolean): void;
    }
    class AStarUtils {
        static computeRoute(character: Game_CharacterBase, startX: number, startY: number, goalX: number, goalY: number, searchLimit: number): {
            best: AStarNode;
            start: AStarNode;
        } | undefined;
    }
    class MassInfo {
        protected _x: number;
        protected _y: number;
        get x(): number;
        get y(): number;
        constructor(...args: [number, number]);
        initialize(x: number, y: number): void;
    }
    class MassRange {
        protected _x: number;
        protected _y: number;
        protected _x2: number;
        protected _y2: number;
        static fromRect(rect: DotMoveRectangle): MassRange;
        get x(): number;
        get y(): number;
        get x2(): number;
        get y2(): number;
        constructor(...args: [number, number, number, number]);
        initialize(x: number, y: number, x2: number, y2: number): void;
        masses(): Set<number>;
    }
    class DotMoveUtils {
        static readonly DIAGONAL_COST: number;
        static readonly MARGIN_UNIT = 65536;
        static readonly MOVED_MARGIN_UNIT: number;
        static isFloatLt(left: number, right: number, margin?: number): boolean;
        static isFloatGt(left: number, right: number, margin?: number): boolean;
        static calcDistance(deg: Degree, far: number): DotMovePoint;
        static nextPointWithDirection(point: DotMovePoint, direction: number, unit?: number): DotMovePoint;
        static prevPointWithDirection(point: DotMovePoint, direction: number, unit?: number): DotMovePoint;
        static direction2Axis(direction4: number): "x" | "y";
        static direction2SignPoint(direction: number): DotMovePoint;
        static direction2HorzAndVert(direction: number): {
            horz: number;
            vert: number;
        };
        static horzAndVert2Direction(horz: number, vert: number): number;
        static checkCollidedRect<T>(rect1: DotMoveRectangle, rect2: DotMoveRectangle, targetObject: T): CollisionResult<T> | undefined;
    }
    class CollisionResult<T> {
        protected _subjectRect: DotMoveRectangle;
        protected _targetRect: DotMoveRectangle;
        protected _targetObject: T;
        protected _rightCollisionLength: number;
        protected _leftCollisionLength: number;
        protected _upCollisionLength: number;
        protected _downCollisionLength: number;
        constructor(...args: [DotMoveRectangle, DotMoveRectangle, T]);
        initialize(subjectRect: DotMoveRectangle, targetRect: DotMoveRectangle, targetObject: T): void;
        get subjectRect(): DotMoveRectangle;
        get targetRect(): DotMoveRectangle;
        get targetObject(): T;
        getCollisionLength(axis: "x" | "y"): number;
        getCollisionLengthByDirection(dir: number): number;
        collisionLengthX(): number;
        collisionLengthY(): number;
        upCollisionLength(): number;
        rightCollisionLength(): number;
        downCollisionLength(): number;
        leftCollisionLength(): number;
        calcUpCollisionLength(): number;
        calcRightCollisionLength(): number;
        calcDownCollisionLength(): number;
        calcLeftCollisionLength(): number;
    }
    class MapCharactersCache {
        protected _cache: (Set<Game_CharacterBase> | undefined)[];
        constructor(...args: [number, number]);
        initialize(width: number, height: number): void;
        massCharacters(mass: number): Set<Game_CharacterBase> | undefined;
        addMapCharactersCache(mass: number, character: Game_CharacterBase): void;
        removeMapCharactersCache(mass: number, character: Game_CharacterBase): void;
    }
    interface CharacterCollisionCheckerOption {
        origX?: number;
        origY?: number;
        overComplementMode?: boolean;
        throughIfCollided?: boolean;
    }
    class CharacterCollisionChecker {
        protected _character: Game_CharacterBase;
        protected _characterIntPosMode: boolean;
        protected _overComplementMode: boolean;
        protected _throughIfCollided: boolean;
        protected _origX: number;
        protected _origY: number;
        constructor(...args: [Game_CharacterBase, CharacterCollisionCheckerOption?]);
        initialize(character: Game_CharacterBase, opt?: CharacterCollisionCheckerOption): void;
        checkCollision(x: number, y: number, d: number): CollisionResult<unknown>[];
        checkHitCharacters<T extends Game_CharacterBase>(x: number, y: number, d: number, targetCharacterClass: new (...args: any[]) => T): CollisionResult<T>[];
        checkCharacter<T extends Game_CharacterBase>(x: number, y: number, d: number, character: T): CollisionResult<T> | undefined;
        checkCollisionMasses(x: number, y: number, d: number): CollisionResult<MassInfo>[];
        isNoCheckMass(ix: number, iy: number, d: number, massRange: MassRange): boolean;
        checkCollisionMass(subjectRect: DotMoveRectangle, d: number, ix: number, iy: number): CollisionResult<MassInfo>[];
        checkCollisionCliff(subjectRect: DotMoveRectangle, massRange: MassRange, d: number): CollisionResult<MassInfo>[];
        checkCollisionXCliff(subjectRect: DotMoveRectangle, x1: number, x2: number, iy: number, d: number): CollisionResult<MassInfo>[];
        checkCollisionYCliff(subjectRect: DotMoveRectangle, y1: number, y2: number, ix: number, d: number): CollisionResult<MassInfo>[];
        checkCollisionCharacters<T extends Game_CharacterBase>(x: number, y: number, d: number, targetCharacterClass: new (...args: any[]) => T): CollisionResult<T>[];
        checkPassMass(ix: number, iy: number, d: number): boolean;
        enteringMassesCharacters(x: number, y: number): Set<Game_CharacterBase>;
        calcSubjectCharacterMassRange(x: number, y: number): MassRange;
        checkCollidedRect<T>(d: number, subjectRect: DotMoveRectangle, targetRect: DotMoveRectangle, targetObject: T): CollisionResult<T> | undefined;
        checkCollidedRectOverComplement<T>(origX: number, origY: number, d: number, subjectRect: DotMoveRectangle, targetRect: DotMoveRectangle, targetObject: T): CollisionResult<T> | undefined;
    }
    class MapCharacterCacheUpdater {
        protected _character: Game_CharacterBase;
        protected _lastRect?: DotMoveRectangle;
        constructor(...args: [Game_CharacterBase]);
        initialize(character: Game_CharacterBase): void;
        updateMapCharactersCache(): void;
        removeMapCharactersCache(): void;
    }
    class CharacterDotMoveProcess {
        protected _character: Game_CharacterBase;
        protected _dpf: number;
        constructor(...args: [Game_CharacterBase]);
        initialize(character: Game_CharacterBase): void;
        dotMoveByDeg(deg: Degree, dpf: number): boolean;
        calcMovedPoint(direction: number, distance: DotMovePoint): DotMovePoint;
        calcUp(dis: DotMovePoint): DotMovePoint;
        calcRight(dis: DotMovePoint): DotMovePoint;
        calcDown(dis: DotMovePoint): DotMovePoint;
        calcLeft(dis: DotMovePoint): DotMovePoint;
        calcUpRight(dis: DotMovePoint): DotMovePoint;
        calcRightDown(dis: DotMovePoint): DotMovePoint;
        calcDownLeft(dis: DotMovePoint): DotMovePoint;
        calcLeftUp(dis: DotMovePoint): DotMovePoint;
        calcSlideRightWhenUp(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideUpWhenRight(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideDownWhenRight(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideRightWhenDown(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideDownWhenLeft(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideLeftWhenDown(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideUpWhenLeft(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcSlideLeftWhenUp(pos: DotMovePoint, dis: DotMovePoint, collisionResults: CollisionResult<unknown>[]): DotMovePoint;
        calcUpRightWithoutSlide(dis: DotMovePoint): DotMovePoint;
        calcRightDownWithoutSlide(dis: DotMovePoint): DotMovePoint;
        calcDownLeftWithoutSlide(dis: DotMovePoint): DotMovePoint;
        calcLeftUpWithoutSlide(dis: DotMovePoint): DotMovePoint;
        correctUpDistance(pos: DotMovePoint, distance: DotMovePoint): DotMovePoint;
        correctRightDistance(pos: DotMovePoint, distance: DotMovePoint): DotMovePoint;
        correctDownDistance(pos: DotMovePoint, distance: DotMovePoint): DotMovePoint;
        correctLeftDistance(pos: DotMovePoint, distance: DotMovePoint): DotMovePoint;
        correctDistance(pos: DotMovePoint, distance: DotMovePoint, dir: number): DotMovePoint;
        getMaxCollisionLength(collisionResults: CollisionResult<unknown>[], dir: number): number;
        slideDistance(dis: DotMovePoint, pos: DotMovePoint, collisionResults: CollisionResult<unknown>[], deg: Degree, dir: number): DotMovePoint;
        canSlide(collisionResults: CollisionResult<unknown>[], dir: number): boolean;
        calcDistance(deg: Degree): DotMovePoint;
        checkCollision(x: number, y: number, d: number, opt?: {
            origX?: number;
            origY?: number;
            overComplementMode?: boolean;
            throughIfCollided?: boolean;
        }): CollisionResult<unknown>[];
        getSlideLength(axis: "x" | "y"): number;
        reachPoint(realPoint: DotMovePoint, targetPoint: DotMovePoint, margin: number): boolean;
    }
    class CharacterMover {
        protected _character: Game_CharacterBase;
        protected _moverData: MoverData;
        constructor(...args: [Game_CharacterBase]);
        initialize(character: Game_CharacterBase): void;
        createCollisionChecker(opt?: CharacterCollisionCheckerOption): CharacterCollisionChecker;
        createDotMoveProcess(): CharacterDotMoveProcess;
        updateMove(): void;
        stopMove(): void;
        resumeMove(): void;
        cancelMove(): void;
        isMovingToTarget(): boolean;
        checkCollision(x: number, y: number, direction: number): CollisionResult<unknown>[];
        checkCollisionCharacters<T extends Game_CharacterBase>(x: number, y: number, direction: number, targetCharacterClass: new (...args: any[]) => T): CollisionResult<T>[];
        checkCharacter<T extends Game_CharacterBase>(x: number, y: number, direction: number, character: T): CollisionResult<T> | undefined;
        checkCharacterStepDir<T extends Game_CharacterBase>(x: number, y: number, direction: number, character: T): CollisionResult<T> | undefined;
        checkHitCharacters<T extends Game_CharacterBase>(x: number, y: number, direction: number, targetCharacterClass: new (...args: any[]) => T): CollisionResult<T>[];
        checkHitCharactersStepDir<T extends Game_CharacterBase>(x: number, y: number, direction: number, targetCharacterClass: new (...args: any[]) => T): CollisionResult<T>[];
        continuousMoveProcess(): void;
        startContinuousMove(targetFar: number, moveDeg: Degree): void;
        dotMoveByDeg(deg: Degree, dpf?: number): void;
        setDirection(d: number): void;
        moveByDirection(d: number, moveUnit: number): void;
        moveStraight(dir: number, moveUnit: number): void;
        moveDiagonally(horz: number, vert: number, moveUnit: number): void;
        moveToTarget(targetPoint: DotMovePoint): void;
    }
    class MoverData {
        private _targetFar;
        private _moveDeg;
        private _stopping;
        get targetFar(): number;
        set targetFar(_targetFar: number);
        get moveDeg(): number;
        set moveDeg(_moveDeg: number);
        get stopping(): boolean;
        set stopping(_stopping: boolean);
        constructor(...args: []);
        initialize(): void;
    }
    class CharacterDotMoveTempData {
        private _mover;
        private _mapCharacterCacheUpdater;
        get mover(): CharacterMover;
        get mapCharacterCacheUpdater(): MapCharacterCacheUpdater;
        constructor(...args: [Game_CharacterBase]);
        initialize(character: Game_CharacterBase): void;
    }
    class PlayerDotMoveTempData extends CharacterDotMoveTempData {
        private _collideTriggerEventIds;
        get collideTriggerEventIds(): number[];
        set collideTriggerEventIds(_collideTriggerEventIds: number[]);
        constructor(character: Game_Player);
        initialize(character: Game_Player): void;
    }
    class EventDotMoveTempData extends CharacterDotMoveTempData {
        private _width;
        private _height;
        private _offsetX;
        private _offsetY;
        private _widthArea;
        private _heightArea;
        private _slideLengthX?;
        private _slideLengthY?;
        private _eventTouchToPlayer;
        get width(): number;
        get height(): number;
        get offsetX(): number;
        get offsetY(): number;
        get widthArea(): number;
        get heightArea(): number;
        get slideLengthX(): number | undefined;
        get slideLengthY(): number | undefined;
        get eventTouchToPlayer(): boolean;
        set eventTouchToPlayer(_eventTouchToPlayer: boolean);
        constructor(character: Game_Event);
        initialize(character: Game_Event): void;
    }
    class FollowerDotMoveTempData extends CharacterDotMoveTempData {
        private _sameDirectionTotalDpf;
        get sameDirectionTotalDpf(): number;
        set sameDirectionTotalDpf(_sameDirectionTotalDpf: number);
        constructor(character: Game_Follower);
        initialize(character: Game_Follower): void;
    }
}
declare const DotMoveSystemClassAlias: typeof DotMoveSystem;
